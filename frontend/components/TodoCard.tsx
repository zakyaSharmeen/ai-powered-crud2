// import { updateTodo, deleteTodo } from "../services/api.ts";

// function TodoCard({ todo, refresh }: any) {
//   return (
//     <div className="border p-2 rounded">
//       <div className="flex justify-between">
//         <h3>{todo.title}</h3>

//         <div className="flex gap-2">
//           <input
//             type="checkbox"
//             checked={todo.completed}
//             onChange={async () => {
//               await updateTodo(todo._id, {
//                 completed: !todo.completed,
//               });
//               refresh();
//             }}
//           />

//           <button
//             onClick={async () => {
//               await deleteTodo(todo._id);
//               refresh();
//             }}>
//             ❌
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default TodoCard;
