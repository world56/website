import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TypeConfirmProps<T = string | number> {
  onOk(id?: T): void;
  onCancel(): void;
  id?: string | number;
}

const Confirm: React.FC<TypeConfirmProps> = ({ id, onOk, onCancel }) => (
  <Dialog open={Boolean(id)} onOpenChange={() => onCancel()}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>确定删除吗？</DialogTitle>
        <DialogDescription>
          <span className="mt-3 mb-1 inline-block text-sm">
            此操作执行后无法撤销，数据库将会永久删除该条数据！
          </span>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => onCancel()} variant="outline" className="mr-1">
          取消
        </Button>
        <Button onClick={() => onOk(id)} type="submit">
          确定
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default Confirm;
