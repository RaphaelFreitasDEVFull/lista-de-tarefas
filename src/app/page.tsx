"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { ListCheck, Loader2, Plus, Sigma, Trash } from "lucide-react";
import EditTask from "@/components/partials/edit-task";
import { getTasks } from "@/actions/get-tasks";
import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import { addTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { toast } from "sonner";
import { toggleDone } from "@/actions/toggle-done";
import Filter from "@/components/partials/filter";
import { deleteDoneTasks } from "@/actions/delete-done-tasks";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskValue, setTaskValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(tasks);
        break;
      case "pending":
        const pendingTasks = tasks.filter((task) => !task.done);
        setFilteredTasks(pendingTasks);
        break;
      case "completed":
        const completed = tasks.filter((task) => task.done);
        setFilteredTasks(completed);
        break;
      default:
        break;
    }
  }, [currentFilter, tasks]);

  const handleGetTasks = async () => {
    const tasks = await getTasks();

    if (!tasks) return;

    setTasks(tasks);
  };

  const handleCreateTask = async () => {
    setLoading(true);
    if (taskValue.length === 0 || !taskValue) {
      toast.error("Digite alguma atividade");
      setLoading(false);
      return;
    }
    const newTask = await addTask(taskValue);

    if (!newTask) return;

    toast.success("Tarefa adicionada com sucesso!");

    setTaskValue("");
    handleGetTasks();
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    if (!id) return;
    const deletedTask = await deleteTask(id);

    if (!deletedTask) return;

    toast.warning("Tarefa deletada com sucesso!");

    handleGetTasks();
  };

  const handleToggleTask = async (id: string) => {
    const previewsTask = [...tasks];

    try {
      setTasks((prev) => {
        const updatedTaskList = prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });
        return updatedTaskList;
      });
      await toggleDone(id);
    } catch (error) {
      setTasks(previewsTask);
      throw error;
    }
  };

  const handleDeleteDoneTasks = async () => {
    const done = await deleteDoneTasks();

    if (!done) return;

    toast.success("Atividades deletadas com sucesso");

    handleGetTasks();
  };

  return (
    <main className="p-8 w-full h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-lg">
        <CardHeader>
          <div className="flex gap-2">
            <Input
              placeholder="Adicionar tarefa..."
              onChange={(e) => setTaskValue(e.target.value)}
              value={taskValue}
            />
            ,
            <Button
              variant={"default"}
              className="cursor-pointer flex gap-1 items-center"
              onClick={handleCreateTask}
            >
              {loading ? <Loader2 className="animate-spin" /> : <Plus />}
              Cadastrar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Separator />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-4 border-b-1">
            {tasks.length === 0 && (
              <p className="text-xs border-t-1 py-4 w-full text-center">
                Você não possui ativades cadastradas
              </p>
            )}
            {filteredTasks?.map((task) => (
              <div
                key={task.id}
                className="h-14 flex items-center justify-between gap-2 border-t-1"
              >
                <div
                  className={`${
                    task.done
                      ? "w-1 bg-green-300 h-full"
                      : "w-1 bg-red-500 h-full"
                  }`}
                ></div>
                <p
                  onClick={() => handleToggleTask(task.id)}
                  className={`${
                    task.done
                      ? "flex-1 text-sm cursor-pointer hover:text-gray-700 line-through"
                      : "flex-1 text-sm cursor-pointer hover:text-gray-700"
                  }`}
                >
                  {task.task}
                </p>
                <div className="flex gap-2">
                  <EditTask task={task} action={handleGetTasks} />
                  <Trash
                    size={16}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex md:flex-row flex-col gap-4 items-center justify-between">
            <div className="flex items-center">
              <ListCheck size={16} />
              <p className="text-xs">
                Tarefas Concluidas ({tasks.filter((task) => task.done).length}/
                {tasks.length})
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 flex items-center cursor-pointer"
                  variant={"outline"}
                >
                  <Trash /> Limpar Tarefas Concluidas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certexa que deseja excluir{" "}
                    {tasks.filter((task) => task.done).length} items?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleDeleteDoneTasks}>
                    Sim
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{
                width: `${
                  (tasks.filter((task) => task.done).length / tasks.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <div className="flex items-center justify-end w-full gap-1">
            <Sigma size={14} />
            <p className="text-xs">{tasks.length} Tarefas no total</p>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Home;
