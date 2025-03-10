import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface TypeConfirmProps<T = string | number> {
  onOk(id?: T): void;
  onCancel(): void;
  id?: string | number;
  description?: string;
}

const Confirm: React.FC<TypeConfirmProps> = ({
  id,
  onOk,
  onCancel,
  description,
}) => {
  const t = useTranslations("common");

  return (
    <Dialog open={Boolean(id)} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("deleteTitle")}</DialogTitle>
          <DialogDescription>
            <span className="mt-3 mb-1 inline-block text-sm">
              {description || t("deleteContent")}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onCancel()} variant="outline" className="mr-1">
            {t("cancel")}
          </Button>
          <Button onClick={() => onOk(id)} type="submit">
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Confirm;
