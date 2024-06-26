"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import TabsSection from "@/components/TabsSection";
import Cards from "@/components/Cards";
import ApiService from "@/apiService";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [showCompletedTask, setShowCompletedTask] = useState(false);

  const getData = async () => {
    const api = new ApiService();
    const data = await api.get("/api/v1/users");
    setTodos(data);
    // console.log(data);
  };

  const finalRenderTodos = useMemo(() => {
    if (showCompletedTask) {
      return todos.filter(
        (filteredCompletedTodo) => filteredCompletedTodo.completed === true
      );
    } else {
      return todos;
    }
  }, [showCompletedTask, todos]);

  // console.log(finalRenderTodos);

  return (
    <div className="h-[100vh] flex justify-center items-center bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-400 ">
      <div className="h-[90%] w-[80%] bg-gray-200 rounded-2xl overflow-y-scroll relative">
        <Navbar getData={getData} />
        <TabsSection
          todos={todos}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowCompletedTask={setShowCompletedTask}
          showCompletedTask={showCompletedTask}
        />
        <Cards
          todos={finalRenderTodos}
          setTodos={setTodos}
          getData={getData}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default Home;
