import { Badge } from "../ui/badge";
import { Check, CircleSlash, List } from "lucide-react";

type FilterProps = {
  currentFilter: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) => {
  return (
    <div className="mt-4 flex gap-2">
      <Badge
        className="cursor-pointer flex items-center"
        variant={`${currentFilter === "all" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("all")}
      >
        <List />
        Todas
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "pending" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("pending")}
      >
        <CircleSlash />
        Não Finalizadas
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "completed" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("completed")}
      >
        <Check />
        Concluidas
      </Badge>
    </div>
  );
};

export default Filter;
