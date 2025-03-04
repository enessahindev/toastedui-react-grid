import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Grid } from "toastedui-react-grid";

export default function Home() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 28,
      email: "john@example.com",
      status: "Active",
      progress: 75,
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      email: "jane@example.com",
      status: "Inactive",
      progress: 30,
    },
    {
      id: 3,
      name: "Mark Johnson",
      age: 35,
      email: "mark@example.com",
      status: "Active",
      progress: 60,
    },
    {
      id: 4,
      name: "Sarah Williams",
      age: 27,
      email: "sarah@example.com",
      status: "Inactive",
      progress: 50,
    },
  ]);

  const [newRow, setNewRow] = useState({
    name: "",
    age: "",
    email: "",
    status: "Active",
  });
  const [showDialog, setShowDialog] = useState(false);

  const columns = [
    { key: "id", title: "ID", width: "small", responsive: ["lg"] },
    { key: "name", title: "Full Name" },
    { key: "age", title: "Age", width: "small", responsive: ["md", "lg"] },
    { key: "email", title: "Email Address", responsive: ["lg"] },
    {
      key: "status",
      title: "Status",
      width: "medium",
      render: (value: any) => (
        <span
          style={{
            backgroundColor: value === "Active" ? "#dff0d8" : "#f2dede",
            padding: "3px 8px",
            borderRadius: "4px",
            color: value === "Active" ? "#3c763d" : "#a94442",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "progress",
      title: "Progress",
      render: (value: any) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#f3f3f3",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${value}%`,
              backgroundColor:
                value > 70 ? "#5cb85c" : value > 30 ? "#f0ad4e" : "#d9534f",
              height: "6px",
              borderRadius: "4px",
            }}
          />
        </div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (_: any, row: { id: number }) => (
        <Button
          variant="destructive"
          size="sm"
          className="cursor-pointer bg-red-600"
          onClick={() => removeRow(row.id)}
        >
          🗑️ Delete
        </Button>
      ),
    },
  ];

  const addRow = () => {
    if (!newRow.name || !newRow.age || !newRow.email) return;
    setData([
      ...data,
      { ...newRow, id: data.length + 1, age: Number(newRow.age), progress: 0 },
    ]);
    setNewRow({ name: "", age: "", email: "", status: "Active" });
    setShowDialog(false);
  };

  const removeRow = (id: number) => {
    setData(data.filter((row) => row.id !== id));
  };

  return (
    <div className="container w-full overflow-x-auto p-4">
      <Button
        onClick={() => setShowDialog(true)}
        variant="outline"
        className="mb-4 cursor-pointer"
      >
        Add Row +
      </Button>
      <Grid
        data={data}
        columns={columns}
        theme="dark"
        pagination={true}
        pageSize={5}
        loading={false}
        striped={true}
        onRowClick={(row: any) => console.log("Row clicked:", row)}
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogTitle>Add New Entry</DialogTitle>
          <Input
            placeholder="Full Name"
            value={newRow.name}
            onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
          />
          <Input
            placeholder="Age"
            type="number"
            value={newRow.age}
            onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newRow.email}
            onChange={(e) => setNewRow({ ...newRow, email: e.target.value })}
          />
          <Button onClick={addRow} variant="link">
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
