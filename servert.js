var mysql=require("mysql")
var connectionString = "mysql://kittipot123:kittipot321@127.0.0.1/testreal?connectionLimit=50"
var pool = mysql.createPool(connectionString)

var express=require("express")
var server = express()
server.listen(12000)

var readVerbPost =express.urlencoded({extended:false}) 
var ejs = require("ejs")
const { NULL } = require("mysql/lib/protocol/constants/types")




server.use(express.static(__dirname + '/public'));

server.engine("html",ejs.renderFile)
//server.set('view engine', 'ejs');


server.get(["/test"],showJoinPage)
server.post(["/test"],readVerbPost,UpdateStatus)

server.get(["/index"],updateDB)


function updateDB(request,response){
    pool.query("select  Transaction_log.Transaction_Id ,Transaction_log.Employees_Code,user.First_name,user.Last_name ,Transaction_log.Time_In ,Transaction_log.Time_Out  FROM Transaction_log INNER JOIN user ON Transaction_log.Employees_Code = user.Employees_Code ;", function show(error, data) {
        if (error == null) {
            tableJoin = data
            response.render('index.ejs', {tableInfo:tableJoin});
        }
        else
            console.log(error)
    })
    
}

function showJoinPage(request,response){
    response.render('test.ejs',{title:"Employee Records",success:' '})
}



var bufferTime=[]
var bufferCode= [ ]
var tableJoin= [ ]
  function UpdateStatus(request,response){

    // buffer  user
    pool.query("select * from user;", function show(error, data) {
        if (error == null) {
            bufferCode = data
            //console.log(bufferCode)
            //console.log(bufferCode.length)      
        }
        else
            console.log(error)
        })

    //buffer transaction_log
   pool.query("select * from Transaction_log;", function show(error, data) {
        if (error == null) {
            bufferTime = data  
        }
        else
            console.log(error)
    })

    

    var f = request.body["full-name"]  || ""
    var e = request.body["time"]  || ""

    var queryTimeOut ="select * from Transaction_log where Employees_Code = ? ORDER BY Time_In DESC limit 1;"


    var insertTimeIn ="insert into Transaction_log(Employees_Code,Time_In ) values(?,?);"
    var updateTimeOut ="update  Transaction_log   set 	Time_Out =? where Employees_Code=?;"
    var detailInput=[f]
    var detailInsert =[f,e]
    var detailUpdate =[e,f]

     pool.query(queryTimeOut,detailInput, function show(error, data) 
     {
        if (error == null) {
            if(bufferCode.some(a => a.Employees_Code === f )){

                if(  !(bufferTime.some(b => b.Employees_Code === f ))){
                    
                    pool.query(insertTimeIn,detailInsert, function show(error, data) {
                    if (error == null) {
                    console.log('insert-for-new-user')
                    response.render('test.ejs',{title:"Employee Records",records:data,success:'Updated Time In - NEW'}) 
                                                 }
                    else
                    console.log(error)
                    }) 
                }
                if( bufferTime.some(b => b.Employees_Code === f ) && data[0].Time_Out===null ){
                    
                    pool.query(updateTimeOut,detailUpdate, function show(error, data) {
                    if (error == null) {
                        console.log('insert-for-new-time-out')
                        response.render('test.ejs',{title:"Employee Records",records:data,success:'Updated Time Out'})
                    }
                    else
                    console.log(error)
                    }) 
                }
                if( bufferTime.some(b => b.Employees_Code === f ) && !(data[0].Time_In===null) && !(data[0].Time_Out===null) ){
                    
                    pool.query(insertTimeIn,detailInsert, function show(error, data) {
                        if (error == null) {
                            console.log('insert-for-new-time-in')
                            response.render('test.ejs',{title:"Employee Records",records:data,success:'Updated Time In'})
                                                     }
                        else
                        console.log(error)
                        })   
                }  
            }

            if(!(bufferCode.some(a => a.Employees_Code === f )))
            {
                console.log('update')
                response.render('test.ejs',{title:"Employee Records",records:data,success:'User Not Found'})
            
            }
            

        }
        else console.log(error) 
     })
    }

