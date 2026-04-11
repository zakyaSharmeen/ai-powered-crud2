const BASE_URL = "http://localhost:5000";

export const sendChat = async (message: string) => {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
};

export const fetchTodos = async () => {
  const res = await fetch(`${BASE_URL}/todos`);
  return res.json();
};

export const updateTodo = async (id: string, updates: any) => {
  await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
};

export const deleteTodo = async (id: string) => {
  await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
};
