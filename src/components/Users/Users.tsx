import { useEffect } from "react";
import { getUsers } from "../../features/usersSlice";
import  { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Users = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.users.data)

    // console.log("users", users)
    // useEffect(() => dispatch(
    //     getUsers();
    //     ))
    console.log("users", users);

    useEffect(() => {
    dispatch(getUsers());
    }, [dispatch]);

    return <div>users be here</div>
};

export default Users;