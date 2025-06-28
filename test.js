const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/api/invoices", async (req, res) => {
    const { amount, client, dueDate } = req.body;

    if (!amount) return res.send("Amount is required");

    await prisma.invoice.create({
        data: {
            amount,
            client,
            dueDate,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    res.send("Invoice created successfully");
});

app.get("/api/invoices", async (req, res) => {
    const invoices = await prisma.invoice.findMany();
    res.json(invoices);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
