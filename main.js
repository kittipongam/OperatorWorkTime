 					  	 
var mysql=require("mysql")
var connectionString = "mysql://kittipot123:kittipot321@127.0.0.1/testname?connectionLimit=50"
var pool = mysql.createPool(connectionString)

var express=require("express")
var server = express()
server.listen(12000)

var readVerbPost =express.urlencoded({extended:false}) 
var ejs = require("ejs")

server.engine("html",ejs.renderFile)


//server.get("/search",showSearchPage)
server.get("/list-name",listName)
server.get(["/join"],showJoinPage)
server.post(["/join"],readVerbPost,updateInMember)

function listName(request,response){
    pool.query("select * from information",
    function  show(error, data){

   	 if (error==null) { 

           var buffer = JSON.stringify(data)
        response.send( )
        }      
    
   	 else response.send(error)
    })
}





function showJoinPage(request,response){
    response.render("join.html")

}


function updateInMember(request,response){
    var f = request.body["full-name-login"]  || ""
    var t = request.body["join-time-login"]  || ""
    var e= request.body["status"]  || ""

    var f1= f.toUpperCase();
    var t1= t.toUpperCase();
    var e1= e.toUpperCase();
    if (f1== null || t1== null || e1 == null){
    response.send("Invalid Data")
    return
    }
    
            
    var sql="insert into information(name,time,status) values"+"(?,?,?)"
    var detail=[f1,t1,e1]
    pool.query(sql,detail, function show(error,result){
                if(error ==null) response.send("OK")
                if(error!=null) response.send(error)
                //dont do this just practical
                })

}


// function showSearchPage(request,response){

//     if (request.query.city == null){
//    	 response.send(`
//    		 <form>
//    			 <input name = "city">
//    			 <button>Search</button>
//              <input name="join-time-login" type="datetime-local"  >
//    		 </form>    
//    		 `)
//    	 } 
// else {
//    		 //response.send("welcome to " + request.query.city)
//    	   var sql = "select name,status ,max(time) as 'MaxDate' from information where name=? group by name,status   "
//    	   var data = []
//    	   data.push(request.query.city)
//    	   pool.query(sql,data,function show(error,data){
//    	  			 if(data.length ==0){
//    	  				 response.send("No branch in " + request.query.city)
//    	  			 }else {
//    	  				 response.send("Found a name with "+ data[0].status )
//    	     		 }
//    		 })

// }
// }

