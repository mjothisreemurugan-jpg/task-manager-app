import { useState, useEffect } from "react";
import { FaTrash, FaSignOutAlt } from "react-icons/fa";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchTasks = async () => {

  try {

    setLoading(true);

    const response = await fetch(
      `http://localhost:5000/tasks/${user.id}`
    );

    const data = await response.json();

    setTasks(data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

useEffect(() => {

  fetchTasks();

}, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask, userId: user.id }),
      });
      if (res.ok) {
        setNewTask("");
        fetchTasks();
      }
    } catch (error) {
      console.log("Add error:", error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await fetch(`http://localhost:5000/update-task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTasks();
    } catch (error) {
      console.log("Toggle error:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/delete-task/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === "Pending") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  const emptyMessages = {
    All: { icon: "📋", text: "No tasks yet!", sub: "Add your first task above" },
    Pending: { icon: "✅", text: "No pending tasks!", sub: "You're all caught up" },
    Completed: { icon: "🎯", text: "No completed tasks!", sub: "Complete a task to see it here" },
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "linear-gradient(to right, #020617, #000814, #00154a)", color: "white", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "240px", background: "rgba(5,8,22,0.95)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        flexShrink: 0, height: "100vh",
      }}>
        <div>
          <div style={{ padding: "28px 20px 0" }}>
            <h1 style={{
              fontSize: "2rem", fontWeight: 900,
              background: "linear-gradient(to right, #f472b6, #60a5fa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              TaskFlow
            </h1>
          </div>
          <div style={{ marginTop: "16px", padding: "0 12px" }}>
            <button style={{
              width: "100%", background: "linear-gradient(to right, #7c3aed, #3b82f6)",
              padding: "12px 18px", borderRadius: "9999px",
              fontSize: "1rem", fontWeight: 600, textAlign: "left",
              display: "flex", alignItems: "center", gap: "10px",
              border: "none", color: "white", cursor: "pointer",
            }}>
              <span>📊</span> Dashboard
            </button>
          </div>
        </div>

        <div style={{ padding: "12px" }}>
          <button
            style={{
              width: "100%", background: "linear-gradient(to right, #7f1d1d, #b91c1c)",
              padding: "13px", borderRadius: "9999px", fontSize: "1rem", fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              border: "none", color: "white", cursor: "pointer",
            }}
            onClick={() => { localStorage.removeItem("currentUser"); window.location.href = "/login"; }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

        <div style={{ padding: "28px 32px 0", flexShrink: 0 }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "20px" }}>
            Ready to crush your tasks today?
          </h1>

          {/* STATS */}
          <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
            {[
              { label: "TOTAL TASKS", value: totalTasks, color: "white" },
              { label: "COMPLETED", value: completedTasks, color: "#4ade80" },
              { label: "PENDING", value: pendingTasks, color: "#facc15" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "24px", height: "120px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <p style={{ color: "#9ca3af", fontSize: "0.75rem", letterSpacing: "0.1em", margin: 0 }}>{label}</p>
                <h2 style={{ fontSize: "3.5rem", fontWeight: 900, color, marginTop: "4px", lineHeight: 1 }}>{value}</h2>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              style={{
                flex: 1, background: "#11162a",
                border: "1px solid rgba(168,85,247,0.3)",
                borderRadius: "9999px", padding: "14px 22px",
                fontSize: "1.1rem", color: "white", outline: "none",
              }}
            />
            <button onClick={addTask} style={{
              background: "linear-gradient(to right, #ec4899, #3b82f6)",
              padding: "14px 32px", borderRadius: "9999px",
              fontWeight: 700, fontSize: "1.1rem",
              cursor: "pointer", border: "none", color: "white", whiteSpace: "nowrap",
            }}>
              + Add Task
            </button>
          </div>

          {/* FILTER */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 900 }}>Task List</h1>
            <div style={{ display: "flex", gap: "8px" }}>
              {["All", "Pending", "Completed"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: "8px 20px", borderRadius: "9999px",
                  fontSize: "0.95rem", fontWeight: 600,
                  cursor: "pointer", border: "none", color: "white",
                  background: filter === f
                    ? "linear-gradient(to right, #7c3aed, #3b82f6)"
                    : "rgba(255,255,255,0.1)",
                }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TASK LIST */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 32px 24px" }}>

          {/* Loading state */}
          {loading ? (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
              <p style={{ fontSize: "1rem" }}>Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div style={{
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "12px", color: "#6b7280",
            }}>
              <span style={{ fontSize: "3rem" }}>{emptyMessages[filter].icon}</span>
              <p style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "#9ca3af" }}>
                {emptyMessages[filter].text}
              </p>
              <p style={{ fontSize: "0.9rem", margin: 0 }}>{emptyMessages[filter].sub}</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {filteredTasks.map((task) => (
                <div key={task.id} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "18px", padding: "12px 18px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <button
                      onClick={() => toggleTask(task.id, task.completed)}
                      style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        border: task.completed ? "none" : "2px solid #6b7280",
                        background: task.completed ? "#22c55e" : "transparent",
                        color: "white", fontSize: "0.95rem", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}
                    >
                      {task.completed && "✓"}
                    </button>
                    <div>
                      <h2 style={{
                        fontSize: "1rem", fontWeight: 700, margin: 0,
                        textDecoration: task.completed ? "line-through" : "none",
                        color: task.completed ? "#9ca3af" : "white",
                      }}>
                        {task.title}
                      </h2>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      padding: "3px 12px", borderRadius: "9999px", fontSize: "0.82rem", fontWeight: 600,
                      background: task.completed ? "rgba(74,222,128,0.15)" : "rgba(250,204,21,0.15)",
                      color: task.completed ? "#4ade80" : "#facc15",
                    }}>
                      {task.completed ? "Done" : "Pending"}
                    </span>
                    <button onClick={() => deleteTask(task.id)} style={{
                      background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "0.95rem",
                    }}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
