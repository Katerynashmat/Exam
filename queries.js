const Pool = require('pg').Pool;
const pool = new Pool({
  host: 'ec2-3-248-4-172.eu-west-1.compute.amazonaws.com',
  database: 'd8ir4c2ds9739l',
  user: 'cnuiaoprtwmnnv',
  password: 'bb300c8b90b1fc82900cebdd9d2f0dd1f7d9446a8704ad8b8252760fdfefe7b8',
  port: 5432,
  ssl: { rejectUnauthorized: false }
})

const getTable = (request, response) => {
  pool.query('SELECT * FROM public.users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const update = (request, response) => {
  const sql = `INSERT INTO public.users (title, photo, text) VALUES($1, $2, $3) `
  const data = [request.body.title, request.body.photo, request.body.text]
  pool.query(sql, data, (error, resuls) => {
    if (error) {
      console.log(error)
    } else {
      console.log("resuls: " + resuls)
      //console.log("request: " + request.body)
      response.redirect("/index.html")
    }
  })
}

const deleteData = (request, response) => {
  console.log("HELLO")
  const sql = `DELETE FROM public.users WHERE id IN ('${request.body.id}');`
  pool.query(sql, (error, resuls) => {
    if (error) {
      console.log(error)
    } else {
      console.log("resuls: " + resuls)
      //console.log("request: " + request.body)
      response.redirect("/index.html")
    }
  })
}



const getStudentById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("SELECT * FROM public.student WHERE student.id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getTable,
  getStudentById,
  update,
  deleteData
}