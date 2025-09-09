import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Tasks } from "@/generated/prisma";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/actions/edit-task";

type TaskProps = {
  task: Tasks;
  action: () => void;
};

const EditTask = ({ task, action }: TaskProps) => {
  const [editedTask, setEditedTask] = useState<string>(task.task);
  const [close, setClose] = useState<boolean>(false);

  const handleEditTask = async (id: string) => {
    if (editedTask !== task.task) {
      await editTask(editedTask, id);
      toast.success("Editado com sucesso");
      setClose(false);
      action();
    }
  };

  return (
    <Dialog onOpenChange={setClose} open={close}>
      <DialogTrigger asChild>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            placeholder="Editar tarefa..."
            value={editedTask}
            onChange={(e) => {
              setEditedTask(e.target.value);
            }}
          />
          <Button
            className="cursor-pointer"
            onClick={() => handleEditTask(task.id)}
          >
            Editar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
