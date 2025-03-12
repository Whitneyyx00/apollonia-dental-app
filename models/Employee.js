const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date },
    position: { type: String },
    department: { type: Schema.Types.ObjectId, ref: "Department" }
});

module.exports = mongoose.model("Employee", EmployeeSchema);