
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CustomButton = ({ disabled, isRounded }: {
    disabled: boolean;
    isRounded: boolean;
}) => {
  return (
    <>
        {/* normal backtick syntax */}
        {/* <Button className={`text-sm ${disabled ? "bg-gray-300" : "bg-blue-500"} ${isRounded && "rounded-full"} p-4`}>
            Custom Button

        </Button> */}

        {/* cn syntax */}
        <Button className={cn("text-sm", disabled ? "bg-gray-300": "bg-blue-500", isRounded && "rounded-full", "p-4")}>
            cn 
        </Button>
    </>
  )
}

export default CustomButton;