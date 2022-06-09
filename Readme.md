# INTRODUCTION
Here is simple PRoject for make web application by using Node.js to make Operator work time for timestamp In and Out

 ----*RU*---- opetation

## CONCEPT

<p align="center">  
	<img width="75%" src="https://user-images.githubusercontent.com/104770048/171844853-8cb33fc0-3a5d-4885-8a62-369e17936272.png"> <br>	
</p>

![image](https://user-images.githubusercontent.com/104770048/171844900-e61e84cb-6202-4a7e-a27d-cfb162e51f9e.png)



## SCHEMA CONCEPTUAL FOR DBMS

![image](https://user-images.githubusercontent.com/104770048/171846034-2133d479-e69d-4a09-8b24-164bf246ac33.png)


Run sqld for demon server

>

    mysqld --console

>



Run client for database

>

    mysql --user root --password


>

Create DATABASE 

>

    create database testreal default charset'UTF8';

>

Create user

>

    create user kittipot123 identified with mysql_native_password by 'kittipot321';

>

GRANT TO USER CREATED

>
    grant all on testreal.* to kittipot123;

>

USE DATABASE

>
    use testname

>





Create Table Transaction Log

>
    create table Transaction_log(
        Transaction_Id   	 integer unique not null auto_increment,
        Employees_Code    character varying(100)  not null,
        Time_In    datetime,
        Time_Out    datetime
    )ENGINE = InnoDB DEFAULT CHARSET=utf8;

>

Create Table user info

>

    create table  user(
		Employees_Code    character varying(100) unique not null,
        First_name    character varying(100) not null,
        Last_name    character varying(100) unique not null
    )ENGINE = InnoDB DEFAULT CHARSET=utf8;


>

INSERT USER INFO

>

	insert into user(Employees_Code,First_name,Last_name) values(1234,”kittipot”,”po-ngam”);
	insert into user(Employees_Code,First_name,Last_name) values(4321,”testfname”,”testlname”);
	insert into user(Employees_Code,First_name,Last_name) values(5678,”mark”,”rober”);
	insert into user(Employees_Code,First_name,Last_name) values(8765,”Mr”,”Beast”);

>


## CODE

Install Node Module

express: <br>
MySQL: to install module mysql of DBMS <br> <br>
ejs: Embedded JavaSCript <br>

>
    npm install express mysql ejs
>

File: /views/home.ejs

>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <title>Document</title>
        <style>
        footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: black;
            color: black;
            text-align: center;
        }
        
        body{
            text-align: center;
            background-color: rgb(191, 238, 160);
        }

        </style>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
            <a class="navbar-brand" href="#">BNH</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/home">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/data">Database</a>
                </li>
            </div>
            </div>
        </nav>
    </head>
    <body >
    

    <div class="App container">
        <div className="information">
        <div className="mb-3">
            <% if(success != ' ' &&( success == 'Updated Time In' || success == 'Updated Time Out' || success != 'User Not Found')) {%>
            <div class="alert alert-success">
                <strong>Detail:</strong> <%= success%>
            </div>
            <% } %>
            <% if(success == 'User Not Found' ) {%>
            <div class="alert alert-info">
                <strong>Detail:</strong> <%= success%>
            </div>
            <% } %>    
        <form method ="post" >
            <br>
            <br>
            <label className="form-label" htmlFor="name">Name:</label><br>
            <input name="full-name" placeholder="Employee Code" required ><br>
            <br><br>
            <label className="form-label" htmlFor="name">Time  : </label><br>
            <input name="time" type="datetime" id="currentDateTime"  required><br>
            <br>
            <br>
            <button >UPDATE</button>
        </form>
                </div>
            </div>
        </div> 
    </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
    </body>

    <footer>
    <span id="time"> </span>
        <script>
        var datetime = new Date();
        console.log(datetime);
        document.getElementById("time").textContent = datetime;
        function refreshTime() {
        const timeDisplay = document.getElementById("time");
        const dateString = new Date().toLocaleString();
        const formattedString = dateString.replace(", ", " - ");
        timeDisplay.textContent = formattedString;

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        document.getElementById("currentDateTime").value = date;
        }
        
        setInterval(refreshTime, 1000);
        </script>
    </footer>
</html>


>

File: /views/data.ejs

>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <title>Document</title>
        <style>
        body{
            background: rgb(223,255,190);
    background: linear-gradient(135deg, rgba(223,255,190,1) 0%, rgba(140,214,135,1) 100%);
            text-align: center;
        }

        </style>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">BNH</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/data">Database</a>
                    </li>
                </div>
            </div>
            </nav>
    </head>
    <body>

    <br>
    <div class="App container">
        <div class="row">
        <div class="table-responsive-md">
            <table class="table table-md table-dark">
                <thead>
                    <tr>
                    <th scope="col">Transaction Id</th>
                    <th scope="col">Employee code</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Time In</th>
                    <th scope="col">Time Out</th>
                    </tr>
                </thead>
                <tbody>
                    <% for (var i = 0; i < tableInfo.length ; i++) { %>
                        <tr>
                        <td><%=tableInfo[i].Transaction_Id%></td>
                        <td><%=tableInfo[i].Employees_Code%></td>
                        <td><%=tableInfo[i].First_name%></td>
                        <td><%=tableInfo[i].Last_name%></td>
                        <td><%=tableInfo[i].Time_In%></td>
                        <td><%=tableInfo[i].Time_Out%></td>
                        </tr>    
                    <% } %>

                </tbody>
            </table>
        </div>
        </div>
    </div>
    </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </body>
    </html>

>

File: server.js

>

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


    server.get(["/home"],showJoinPage)
    server.post(["/home"],readVerbPost,UpdateStatus)

    server.get(["/data"],updateDB)

>

<br>

>

    function updateDB(request,response){
        pool.query("select  Transaction_log.Transaction_Id ,Transaction_log.Employees_Code,user.First_name,user.Last_name ,Transaction_log.Time_In ,Transaction_log.Time_Out  FROM Transaction_log INNER JOIN user ON Transaction_log.Employees_Code = user.Employees_Code ;", function show(error, data) {
            if (error == null) {
                tableJoin = data
                response.render('data.ejs', {tableInfo:tableJoin});
            }
            else
                console.log(error)
        })
        
    }
   
   
>

<br>

>

    

    function showJoinPage(request,response){
        response.render('home.ejs',{title:"Employee Records",success:' '})
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

>

<br>

>

        

        var f = request.body["full-name"]  || ""
        var e = request.body["time"]  || ""

        var queryTimeOut ="select * from Transaction_log where Employees_Code = ? ORDER BY Time_In DESC limit 1;"


        var insertTimeIn ="insert into Transaction_log(Employees_Code,Time_In ) values(?,?);"
         var updateTimeOut ="update  Transaction_log   set 	Time_Out =? where Employees_Code=? ORDER BY Time_In DESC limit 1;"
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
                        response.render('home.ejs',{title:"Employee Records",records:data,success:'Updated Time In - NEW'}) 
                                                    }
                        else
                        console.log(error)
                        }) 
                    }
                    if( bufferTime.some(b => b.Employees_Code === f ) && data[0].Time_Out===null ){
                        
                        pool.query(updateTimeOut,detailUpdate, function show(error, data) {
                        if (error == null) {
                            console.log('insert-for-new-time-out')
                            response.render('home.ejs',{title:"Employee Records",records:data,success:'Updated Time Out'})
                        }
                        else
                        console.log(error)
                        }) 
                    }
                    if( bufferTime.some(b => b.Employees_Code === f ) && !(data[0].Time_In===null) && !(data[0].Time_Out===null) ){
                        
                        pool.query(insertTimeIn,detailInsert, function show(error, data) {
                            if (error == null) {
                                console.log('insert-for-new-time-in')
                                response.render('home.ejs',{title:"Employee Records",records:data,success:'Updated Time In'})
                                                        }
                            else
                            console.log(error)
                            })   
                    }  
                }

                if(!(bufferCode.some(a => a.Employees_Code === f )))
                {
                    console.log('update')
                    response.render('home.ejs',{title:"Employee Records",records:data,success:'User Not Found'})
                
                }
                

            }
            else console.log(error) 
        })
        }



>

# Result

>
	run node server.js 
>

>
	http://localhost:12000/home
>

## HOME PAGE

<p align="center">
	<img width="75%" src="https://user-images.githubusercontent.com/104770048/171846304-265108f6-a1f4-45f2-83f3-271af0e4b97a.png"> <br>
	Case: User not found [Employee Code doesnot exist in user info] <br>
	<img width="75%" src="https://user-images.githubusercontent.com/104770048/171846643-51f5bb49-b4fa-40b4-bfed-8072ac2f9b17.png"> <br>
	Case: Update Time in [Employee Code exist in user info with 1234]<br>
	<img width="75%" src="https://user-images.githubusercontent.com/104770048/171846683-fcaaf342-3b4a-4892-b54a-1fbfdd5744f5.png"> <br>
	Case: Update Time Out [Employee Code exist in user info with 1234]<br>
	<img width="75%" src="https://user-images.githubusercontent.com/104770048/171846779-44e7febb-aad2-4a92-ab1f-1f6b6edf1f11.png"> <br>
</p>

## Database
<p align="center">
	<img width="75%" src="https://user-images.githubusercontent.com/104770048/171846912-55702761-4101-4421-9dae-6b2c6d90f3ee.png"> <br>
</p>

<p align="center">
	2 case that just add for 1234 time in and out<br>
	<img width="75%" src="https://user-images.githubusercontent.com/104770048/171846987-277fef63-fb0c-4ec1-9de2-315d01835db5.png"> <br>
</p>

## Development Plan

<ul>
    <li>Add filter to Database table</li>
    <li>Add Page to Add user into DATABASE(Table user):[ALSO Delete or update user</li>
    <li>Add Login page for HR</li>
</ul>

## Challenging for Me

<ul>
    <li>Create by using Frontend FrameWork == REACT</li>
    <li>Create by using Frontend FrameWork == Angular</li>
    <li>Create by using Frontend FrameWork == Vue.js</li>
    <li>***Use Cloud database AWS</li>
</ul>
