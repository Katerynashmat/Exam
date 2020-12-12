const Pool = require('pg').Pool;
const pool = new Pool({
 host: 'ec2-3-248-4-172.eu-west-1.compute.amazonaws.com',
  database: 'd8ir4c2ds9739l',
  user:'cnuiaoprtwmnnv',
  password: 'bb300c8b90b1fc82900cebdd9d2f0dd1f7d9446a8704ad8b8252760fdfefe7b8',
  port: 5432, 
  ssl: { rejectUnauthorized: false }
}) 

const getTable = (request, response) =>{
    pool.query('SELECT * FROM public.users', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
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
    getStudentById
}