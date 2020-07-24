var mongoose = require("mongoose");

var teacherDescriptionSchema = new mongoose.Schema({
	name: String,
	description: String,
	email: String,
	experience: String,
	phoneNo: String,
	address: String,
	expertiseSubject: String
});

module.exports = mongoose.model("teacherDescription", teacherDescriptionSchema);