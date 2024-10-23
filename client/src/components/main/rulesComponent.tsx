import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { DialogDemo } from "./dialog";
import AddRuleDialog from "./addRuleDialog";

export interface rulesInterface {
    name: string;
    ast: object;
    id: string;
}


function RulesComponent() {
    const [rules, setRules] = useState<rulesInterface[]>([]);

    const fetchRules = async () => {
        try {
            if(localStorage.getItem('myapp-asts') === null){
                const response = await axiosInstance.get('/get_rules');
                localStorage.setItem('myapp-asts', JSON.stringify(response.data.allRules));
                setRules(response.data.allRules);
            }
            else{
                setRules(JSON.parse(localStorage.getItem('myapp-asts')!));
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    useEffect(() => {
        fetchRules();
    }, [])
    useEffect(() => {
        localStorage.removeItem('myapp-asts');
    }, [rules.length,rules])


    console.log(rules);

    return (
        <>
            <main className="w-full">
                <div className='container px-10'>
                    <h1 className='lg:text-7xl md:text-5xl text-3xl font-bold text-center m-2 p-5'>Abstract Syntax Trees</h1>
                    <div className='mt-10 flex gap-5 md:flex-row flex-col items-center flex-wrap'>
                        {
                            rules.map((rule, index) => (
                                <Card key={`${rule.id} + ${index}`} className="min-w-[300px] pb-8 pt-6 bg-gray-950 text-gray-200 shadow-md shadow-gray-600 font-custom flex flex-col" >
                                    <CardHeader className="text-2xl text-center font-semibold font-custom">
                                        {rule.name}
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-around text-xl">
                                        <DialogDemo ruleString={rule.ast} />
                                        <Button variant='destructive'>Delete</Button>
                                    </CardContent>
                                </Card>
                            ))
                        }
                        <Card className="w-[300px] pb-8 pt-6 bg-gray-950 text-gray-200 shadow-md shadow-gray-600 flex flex-col justify-between items-center">
                            <CardHeader className="text-2xl text-center font-semibold w-full h-full">Add Rule</CardHeader>
                            <CardContent className="items-center flex w-full justify-center h-full">
                                <AddRuleDialog setRules={setRules}/>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>

        </>
    )
}

export default RulesComponent
