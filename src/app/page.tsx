import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  CircleSlash,
  List,
  ListCheck,
  Plus,
  Sigma,
  SquarePen,
  Trash,
} from "lucide-react";

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-lg">
        <CardHeader>
          <div className="flex gap-2">
            <Input placeholder="Adicionar tarefa..." />,
            <Button
              variant={"default"}
              className="cursor-pointer flex gap-1 items-center"
            >
              <Plus /> Cadastrar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Separator />
          <div className="mt-4 flex gap-2">
            <Badge
              className="cursor-pointer flex items-center"
              variant={"default"}
            >
              <List />
              Todas
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <CircleSlash />
              Não Finalizadas
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <Check />
              Concluidas
            </Badge>
          </div>

          <div className="mt-4 border-b-1">
            <div className="h-14 flex items-center justify-between gap-2  border-t-1">
              <div className="w-1 bg-green-300 h-full"></div>
              <p className="flex-1 text-sm">Estudar React</p>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <SquarePen size={16} className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Tarefa</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Input placeholder="Editar tarefa..." />
                      <Button className="cursor-pointer">Editar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1">
              <ListCheck size={16} />
              <p className="text-xs">Tarefas Concluidas (3/3)</p>
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
                    Tem certexa que deseja excluir x items?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "35%" }}
            ></div>
          </div>
          <div className="flex items-center justify-end w-full gap-1">
            <Sigma size={14} />
            <p className="text-xs">3 Tarefas no total</p>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Home;
