"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";

export default function TaskList({
  tasks,
  setTasks,
  onEdit,
}: {
  tasks: any[];
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
  onEdit: (task: any) => void;
}) {
  const toggleComplete = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "PATCH" });
    if (res.ok) {
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: updated.completed } : t
        )
      );
      toast.success(
        updated.completed
          ? "Task marked as complete ✅"
          : "Task marked as pending 🕒"
      );
    } else {
      toast.error("Failed to update task 😕");
    }
  };

  const deleteTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted 🗑️");
    } else {
      toast.error("Failed to delete task 😞");
    }
  };

  return (
    <div className="space-y-3 mt-6">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex justify-between items-center p-4 rounded-xl border shadow-sm ${
              task.completed
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200 dark:bg-gray-800 dark:text-[#ffffffcf] "
            }`}
          >
            <div>
              <h3
                className={`font-medium ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800 dark:text-[#ffffffcf]"
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-500">{task.description}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => toggleComplete(task.id)}
                className={`p-2 rounded-full transition ${
                  task.completed
                    ? "text-gray-500 hover:text-green-500"
                    : "text-green-600 hover:text-green-800"
                }`}
                title={
                  task.completed ? "Mark as Incomplete" : "Mark as Complete"
                }
              >
                <CheckCircle size={20} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => deleteTask(task.id)}
                className="p-2 text-red-600 hover:text-red-800 rounded-full transition"
                title="Delete Task"
              >
                <Trash2 size={20} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => onEdit(task)}
                className="p-2 text-blue-600 hover:text-blue-800 rounded-full transition"
                title="Edit Task"
              >
                <Pencil size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
