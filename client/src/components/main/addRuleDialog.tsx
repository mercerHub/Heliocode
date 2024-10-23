import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { rulesInterface } from "./rulesComponent";

type FormData = {
    ruleString: string;
    name: string;
}


function AddRuleDialog({setRules}:{setRules:React.Dispatch<React.SetStateAction<rulesInterface[]>>}) {
    const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
    const [success, setSuccess] = useState<boolean|null>(null);

    useEffect(()=>{
        setSuccess(null);
    },[])

    const onSubmit = async (data: FormData) => {

        try {
            const response = await axiosInstance.post('/create_rule',data)
            .then((response) => {
                setRules(prev => ([...prev, response.data.instanceInDb]));
                localStorage.setItem('myapp-asts', JSON.stringify(prev => ([...prev, response.data.instanceInDb])));
                return response.data;
            })
            .catch((error) => error.response.data);
            window.alert(response.message);
            setSuccess(response.success);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Dialog>
                <DialogTrigger asChild className="w-full h-full">
                    <Button variant="outline" className="text-gray-800 hover:bg-gray-200 w-full items-center justify-center">Add Rule</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader className="flex flex-col font-custom">
                        <DialogTitle>Enter Rule String</DialogTitle>
                        <DialogDescription>Make Sure the string you enter is valid</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                        <Label htmlFor="name">Rule Name </Label>
                        <Input
                            id="name"
                            {...register("name", { required: "Name is required" })}
                            className="col-span-3" />
                        <Label htmlFor="ruleString">Rule String</Label>
                        <Input
                            id="ruleString"
                            {...register("ruleString", { required: "Rule String is required" })}
                            className="col-span-3" />
                        {errors.ruleString && <p className="text-red-500">{errors.ruleString.message}</p>}
                        <Button type="submit" className="w-full">Add Rule</Button>
                        {success === true && <p className="text-green-500">Rule Added Successfully</p>}
                        {success === false && <p className="text-red-500">Failed to add Rule</p>}
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddRuleDialog
