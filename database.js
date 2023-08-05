const oracledb = require("oracledb");
// Set database connection details
const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:1521/orcl",
};
const Query = async (sql) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);
    await connection.commit();
    return result;
  } catch (error) {
    return (error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const Result = async (...Parameters) => {
  
  let Sql;
  console.log(typeof (Parameters[2]));
  Details = Parameters[2];
    try{
      Details = eval(`(${Parameters[2]})`);
    } catch(err){}
 switch (Parameters[1]) {
    case "Insert":
      Sql = `insert into ${Parameters[0]} values('${Details.soil_id}','${Details.soil_type}','${Details.soil_ph}','${Details.organic_matter}','${Details.nitrogen}','${Details.phosphorus}','${Details.potassium}')`;
      break;
    case "Update":
      Sql = `update ${Parameters[0]} set soil_id = '${Parameters[3].soil_id}', soil_type = '${Parameters[3].soil_type}', soil_ph = '${Parameters[3].soil_ph}', organic_matter = '${Parameters[3].organic_matter}', nitrogen = '${Parameters[3].nitrogen}', phosphorus = '${Parameters[3].phosphorus}', potassium = '${Parameters[3].potassium}' where soil_id = '${Details}'`;
      break;
    case "Delete":
      Sql = `delete from ${Parameters[0]} where soil_id = '${Details}'`;
      break;
    case "Read":
        Sql = `select * from ${Parameters[0]}`;
        if(Details != "All"){
          Sql = `select * from ${Parameters[0]} where soil_id = '${Details}'`;
        }
      break;
    default:
      console.error("Invalid Parameters");
      break;
  }
  console.log(Sql);
  var result = await Query(Sql);
  return result;
};
module.exports = Result;