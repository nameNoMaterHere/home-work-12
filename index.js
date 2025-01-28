import Express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = Express()
mongoose.connect("mongodb+srv:")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use(cors({ origin: "*" }))
app.use(Express.json())
const employeSchema = new mongoose.Schema({
    name: String,
    department: String,
    age: Number,
    salary: Number
})
const EmployeeModel = mongoose.model("Employee", employeSchema)
app.post("/addEmployee", async (req, res) => {
    try {
        const { name, department, age, salary } = req.body;

        const newEmployee = await EmployeeModel.create({
            name,
            department,
            age,
            salary,
        });

        res.json({ message: "Employee added successfully!" });
    } catch (err) {
        console.error("Error adding employee:", err); // הדפסת השגיאה
        res.status(500).send("Error adding employee: " + err.message);
    }
})
app.delete("/deleteEmployeesAboveAge", async (req, res) => {
    try {
        const { age } = req.body;
        const result = await EmployeeModel.deleteMany({ age: { $gt: age } })
        res.json({ message: `${result.deletedCount} employees deleted successfully!` });
    } catch (err) {
        res.status(500).send(console.log(res.body.age))//{ message: "Error deleting employees: " + err.message }*//);
    }
})
app.put("/department", async (req, res) => {
    try {
        const { oldDepartment,newDepartment  } = req.body
        const result = await EmployeeModel.updateMany(
            { department: oldDepartment },
            { $set: { department: newDepartment } }
        )
        res.json({ message: `${result.modifiedCount} employees updated successfully!` });
    } catch (error) {
        res.send(console.error(error))
    }

})

app.listen(3000, () => {
    console.log("listening on 3000..")
})
