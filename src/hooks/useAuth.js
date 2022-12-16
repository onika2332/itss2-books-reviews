import React from "react";

export const useAuth = () =>
{
    const token = localStorage.getItem("APP_TOKEN");
    const user=localStorage.getItem("ACTIVE_USER");
    const isAuth=localStorage.getItem("IS_AUTH");

    return [user,token,isAuth];
}