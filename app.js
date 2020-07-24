var express            = require("express"),
    app                = express(),
    bodyParser         = require("body-parser"),
    mongoose           = require("mongoose"),
    Teacher            = require("./models/teacher.ejs"),
    flash              = require("connect-flash"),
    passport           = require("passport"),
    LocalStrategy      = require("passport-local"),
    methodOverride     = require("method-override"),   
    teacherDescription = require("./models/teacherDescription.js");


mongoose.connect("mongodb://localhost:27017/tutordelhiP3"
	,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Teacher.authenticate()));
passport.serializeUser(Teacher.serializeUser());
passport.deserializeUser(Teacher.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentTeacher = req.teacher;
    // res.locals.error       = req.flash("error");
    // res.locals.success     = req.flash("success");
    next();
});


//home route path setting,
 app.get("/", function(req, res){
    res.render("landing");
});
 //teacher registration form (sign up logic)
 app.get("/teacher", function(req, res){
 	res.render("registration/teacher");
 });

 //handle SignIn logic
 app.post("/teacher", function(req, res){
 	var newTeacher = new Teacher({ username: req.body.username});
 	if(req.body.adminCode === 'secret_Code'){

 	 newTeacher.isAdmin = true;
 	}
 	Teacher.register(newTeacher, req.body.password, function(err, teacher){
 		if(err){
 			// req.flash("error", err.message);
 			return res.render("registration/teacher");
 		}
 		passport.authenticate("local")(req, res, function(){
 			console.log(teacher);
 			// req.flash("success", "Welcome " + teacher.username);
 			res.redirect("/");
 		});
 	});

 	});

 //show login form
 app.get("/teacherLogin", function(req, res){
 	res.render("registration/teacherLogin");
 });

//handle login logic
app.post("/teacherLogin", passport.authenticate("local",{
	successRedirect: "/",
	failureRedirect: "/teacherLogin"
}), function(req, res){

});
//logout logic
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Project TD Server Working");
});