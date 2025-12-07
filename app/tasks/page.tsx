"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import TaskList from "@/components/TaskList";
// export default function TasksPage() {

export default function TasksPage({ initialTasks }: { initialTasks: any[] }) {
  const [tasks, setTasks] = useState(initialTasks);

  const [editingTask, setEditingTask] = useState<any | null>(null);

  const addTask = (task: any) => {
    setTasks((prev) => [task, ...prev]); // new task on top
  };
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/sign-in");
  }, [isLoaded, isSignedIn, router]);

  // Fetch all tasks for the logged-in user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        if (res.ok) setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // console.log(formData);
      if (res.ok) {
        const newTask = await res.json();
        setTasks((prev) => [newTask, ...prev]);
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          dueDate: "",
        });
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoaded || loading)
    return <div className="p-4 text-center">Loading...</div>;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tasks/${editingTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTask),
      });

      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) =>
          prev.map((task) => (task.id === updated.id ? updated : task))
        );
        setEditingTask(null);
      } else {
        console.error("Failed to update task");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-800 text-[#37352f] dark:text-[#ffffffcf]">
      <div className="w-2xl mx-auto p-4 dark:bg-gray-800 text-[#37352f] dark:text-[#ffffffcf]">
        <h1 className="text-2xl font-bold mb-4 text-center">🗒️ Task Manager</h1>

        {/* Task Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-4 space-y-4 dark:bg-gray-700 text-[#37352f] dark:text-[#ffffffcf]"
        >
          <div>
            <label className="block font-semibold">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </form>
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-md dark:bg-gray-800 text-[#37352f] dark:text-[#ffffffcf]">
              <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  className="w-full border p-2 rounded-lg"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                />

                <textarea
                  className="w-full border p-2 rounded-lg"
                  value={editingTask.description || ""}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                />

                <select
                  className="w-full border p-2 rounded-lg"
                  value={editingTask.priority}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <input
                  type="date"
                  className="w-full border p-2 rounded-lg"
                  value={editingTask.dueDate?.split("T")[0] || ""}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, dueDate: e.target.value })
                  }
                />

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">My Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Add one above!</p>
          ) : (
            <ul className="space-y-3">
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                onEdit={setEditingTask}
              />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
