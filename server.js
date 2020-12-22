const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { off } = require("./db");

require('dotenv').config()

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


// GET call for fetching all banks names
app.get("/api/banks", async (req, res) => { 
    try {
        const all_banks = await pool.query("select * from banks order by name");
        res.json(all_banks.rows);

    } catch (err) { 
        console.error(err.message);
    }
})

//Search with offset and limit 
//Situation for Particular city in dropdown is also considered

app.get("/api/branches/:city/:search/:limit/:offset", async(req, res) => { 
    try {
        const search = req.params.search.toUpperCase();
        const limit = req.params.limit;
        const offset = req.params.offset;
        const city = req.params.city;

        var Search_query = `select * from bank_branches `;
        Search_query += `where ifsc like '%${search}%' or `;
        Search_query += `branch like '%${search}%' or `;
        Search_query += `address like '%${search}%' or `;
        Search_query += `city like '%${search}%' or `;
        Search_query += `district like '%${search}%' or `;
        Search_query += `state like '%${search}%' or `;
        Search_query += `bank_name like '%${search}%' `;
        Search_query += `order by ifsc`;
     
        if (city !== 'All Cities') {
            Search_query = `select * from (${ Search_query }) as result where result.city = '${ city }'`;
        }

        console.log(`${search} ${city} ${offset} ${limit}`);

        var all_tuples = await pool.query(Search_query);
        all_tuples = all_tuples.rows;
        
        const response_tuples = all_tuples.slice(offset, +offset + +limit);
        console.log(response_tuples.length , all_tuples.length)
        res.json({
            data: response_tuples,
            searchSize: all_tuples.length
        });;
        
    } catch(err) {
        console.error(err.message);
    }
})

//Search with offset and limit 
//Situation for Particular city in dropdown is also considered

app.get("/api/bank/:name/:city/:search/:limit/:offset", async(req, res) => { 
    try {
        const search = req.params.search;
        const limit = req.params.limit;
        const offset = req.params.offset;
        const city = req.params.city;
        const name = req.params.name;

        var Search_query = `select * from bank_branches `;
        Search_query += `where ifsc like '%${search}%' or `;
        Search_query += `branch like '%${search}%' or `;
        Search_query += `address like '%${search}%' or `;
        Search_query += `city like '%${search}%' or `;
        Search_query += `district like '%${search}%' or `;
        Search_query += `state like '%${search}%' or `;
        Search_query += `bank_name like '%${search}%' `;
        Search_query += `order by ifsc`;
     
        if (city !== 'All Cities') {
            Search_query = `select * from (${ Search_query }) as result where result.city = '${ city }' and result.bank_name = '${name}'`;
        }
        else {
            Search_query = `select * from (${Search_query}) as result where result.bank_name = '${name}'`;           
        }

        var all_tuples = await pool.query(Search_query);
        all_tuples = all_tuples.rows;
        
        const response_tuples = all_tuples.slice(offset, +offset + +limit);
        res.json(response_tuples);;
        
    } catch(err) {
        console.error(err.message);
    }
})

app.use(express.static('frontend-task/build'));
app.get('*', (req, res) =>
	res.sendFile(path.resolve(__dirname, 'frontend-task', 'build', 'index.html')),
);

app.listen(port, () => {
    console.log(`Server is listning on ${ port }`);
})