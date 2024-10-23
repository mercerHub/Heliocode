
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { axiosInstance } from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type FormData = {
    name: string;
    department: string;
    age: number;
    experience: number;
    salary: number;
};

interface DialogDemoProps {
    ruleString: object;
}

export function DialogDemo({ ruleString }: DialogDemoProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [eligible, setEligible] = useState<boolean | null>(null);
    useEffect(() => {
        setEligible(null);
    },[])


    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/evaluate_rule', { rule: ruleString, data }).then((response) => response.data);

            console.log(response);
            setEligible(response.result);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="text-gray-800 hover:bg-gray-200">Test Data</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader className="flex flex-col">
                        <DialogTitle>Enter User Data</DialogTitle>
                        <DialogDescription>Enter the user data you want to check</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                {...register("name", { required: "Name is required" })}
                                className="col-span-3"
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                            <Label htmlFor="department">Department</Label>
                            <Select onValueChange={(value) => setValue("department", value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Departments</SelectLabel>
                                        <SelectItem value="Sales">Sales</SelectItem>
                                        <SelectItem value="Hr">HR</SelectItem>
                                        <SelectItem value="Engineering">Engineering</SelectItem>
                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                        <SelectItem value="Finance">Finance</SelectItem>
                                        <SelectItem value="Operations">Operations</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.department && <p className="text-red-500">{errors.department.message}</p>}

                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                {...register("age", { required: "Age is required", min: { value: 0, message: "Must be at least 18" } })}
                                className="col-span-3"
                            />
                            {errors.age && <p className="text-red-500">{errors.age.message}</p>}

                            <Label htmlFor="experience">Experience</Label>
                            <Input
                                id="experience"
                                type="number"
                                {...register("experience", { required: "Experience is required", min: { value: 0, message: "Experience cannot be negative" } })}
                                className="col-span-3"
                            />
                            {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}

                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                id="salary"
                                type="number"
                                {...register("salary", { required: "Salary is required", min: { value: 0, message: "Salary cannot be negative" } })}
                                className="col-span-3"
                            />
                            {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}
                        </div>

                        <DialogFooter className="flex flex-col ">
                            <Button type="submit" className="w-full py-4">{loading ? <Loader2 className="animate-spin"/> : "Test" }</Button>
                            
                        </DialogFooter>
                        <span className="w-full text-center">
                            {eligible !== null && (eligible ? <p className="text-green-500 text-xl">Eligible</p> : <p className="text-red-500 text-xl">Not Eligible</p>)}
                            </span>
                    </form>
                </DialogContent>
            </Dialog>
            );
        }
    