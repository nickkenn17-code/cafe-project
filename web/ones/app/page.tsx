export default async function Home() {
  const res = await fetch("http://172.16.2.43:3000/products");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const products = await res.json();
  return (
    <div>
      <h1>Hello Web</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Pice</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.description}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}


// export default async function Home() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   const products = await res.json();
//   console.log("prductsssss", products)
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-6">
//           User List
//         </h1>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
//                 <th className="p-3">ID</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Username</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Company</th>
//                 <th className="p-3">Phone</th>
//                 <th className="p-3">Website</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product, index) => (
//                 <tr
//                   key={product.id}
//                   className={`border-b hover:bg-gray-50 transition ${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   }`}
//                 >
//                   <td className="p-3 text-sm text-gray-700">{product.id}</td>
//                   <td className="p-3 text-sm font-medium text-gray-900">
//                     {product.name}
//                   </td>
//                   <td className="p-3 text-sm text-gray-700">
//                     {product.username}
//                   </td>
//                   <td className="p-3 text-sm text-blue-600">
//                     {product.email}
//                   </td>
//                   <td className="p-3 text-sm text-gray-700">
//                     {product.company?.name}
//                   </td>
//                   <td className="p-3 text-sm text-gray-700">
//                     {product.phone}
//                   </td>
//                   <td className="p-3 text-sm text-indigo-600">
//                     {product.website}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
