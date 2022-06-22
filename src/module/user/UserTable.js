import { ActionDelete, ActionEdit } from "components/action";
import { Table } from "components/table";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserTable = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", userInfo?.uid);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#ef233c",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        await deleteUser(userInfo);
        toast.success("Delete user successfully!");
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
      }
    });
  };

  console.log(userInfo);
  const date = new Date(userInfo?.metadata?.creationTime).toString();
  const formatDate = date.slice(0, 15);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Information</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={userInfo?.uid}>
            <td title={userInfo?.uid}>{userInfo?.uid?.slice(0, 5) + "..."}</td>
            <td>
              <div className="flex items-center gap-x-3">
                <img
                  src={`${
                    userInfo.photoURL ||
                    "https://images.unsplash.com/photo-1651782561192-56c26d84af1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  }`}
                  alt=""
                  className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{userInfo?.displayName}</h3>
                  <time className="text-sm text-gray-400">{formatDate}</time>
                </div>
              </div>
            </td>
            <td>{slugify(userInfo?.displayName || "", { lower: true })}</td>
            <td>{userInfo?.email}</td>
            <td>
              <div className="flex items-center gap-x-3">
                <ActionEdit
                  onClick={() =>
                    navigate(`/manage/update-user?id=${userInfo?.uid}`)
                  }
                ></ActionEdit>
                <ActionDelete
                  onClick={() => handleDeleteUser(userInfo)}
                ></ActionDelete>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
