import { useEffect, useState } from "react";
import {axiosInstance} from "../../utils/axiosInstance";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { DialogDemo } from "./dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

interface rulesInterface {
    name: string;
    ast: object;
    id: string;
}

type FormData = {
    ruleString: string;
    name: string;
}


function RulesComponent() {
    const [rules,setRules] = useState<rulesInterface[]>([]);
    const {handleSubmit, register, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await axiosInstance.get('/get_rules');
                setRules(response.data.allRules);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRules();
    },[])

    const onSubmit = async (data: FormData) => {
       
        console.log(data);
    };


    console.log(rules);

    return (
        <>  
            <main className="">
                <div className='container px-10'>
                    <h1 className='text-3xl font-bold text-center mt-10'>Rules</h1>
                    <div className='mt-10 flex gap-5'>
                        {
                            rules.map((rule,index) => (
                                <Card key={`${rule.id} + ${index}`} className="w-[300px] pb-8 pt-6 bg-black text-gray-200 shadow-md shadow-gray-600" >
                                    <CardHeader className="text-2xl text-center font-semibold">
                                        {rule.name}
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-around text-xl">
                                    <DialogDemo ruleString={rule.ast}/>
                                        <Button variant='destructive'>Delete</Button>
                                    </CardContent>
                                </Card>
                            ))
                        }
                        <Card className="w-[300px] pb-8 pt-6 bg-black text-gray-200 shadow-md shadow-gray-600">
                        <CardHeader className="text-2xl text-center font-semibold">Add Rule</CardHeader>
                        <CardContent className="items-center flex w-full">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="text-gray-800 hover:bg-gray-200 w-full">Add Rule</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[450px]">
                                    <DialogHeader className="flex flex-col">
                                        <DialogTitle>Enter Rule String</DialogTitle>
                                        <DialogDescription>Make Sure the string you enter is valid</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                                        <Label htmlFor="ruleString">Rule String</Label>
                                        <Input
                                            id="ruleString"
                                            {...register("ruleString", { required: "Rule String is required" })}
                                            className="col-span-3"/>
                                        {errors.ruleString && <p className="text-red-500">{errors.ruleString.message}</p>}
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                    </div>
                    
                </div>
            </main>
        
        </>
    )
}

export default RulesComponent
