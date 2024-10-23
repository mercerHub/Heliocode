import { useEffect, useState } from "react"
import { axiosInstance } from "../utils/axiosInstance";
import { rulesInterface } from "../components/main/rulesComponent";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from "../components/ui/select";
import { SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";


type modeType = 'combineASTs' | 'combineASTAndRule' | 'combineRules';

function MergeAsts() {

    const [rules, setRules] = useState<rulesInterface[]>([]);
    const [selectedRules, setSelectedRules] = useState<string[]>([]);
    const [mode,setMode] = useState<modeType>('combineASTs');
    const [ruleString, setRuleString] = useState<string>('');
    const [ruleName, setRuleName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    

    const handleCombineRules = async () => {
        if(ruleName === '') {
            alert('Please provide a rule name');
            return;
        }
        setLoading(true);
        try {
            console.log(selectedRules);

            await axiosInstance.post('/combine_rules', {
                rules: [ruleString],
                names: selectedRules,
                mode: mode,
                ruleName: ruleName
            }).then((response) => {
                setRules(prev => ([...prev, response.data.combinedRulesInstanceInDb]));
                localStorage.setItem('myapp-asts', JSON.stringify(rules));
            }).catch((error) => console.error(error.response.data));

        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchRules = async () => {
            try {
                if (localStorage.getItem('myapp-asts') === null) {
                    const response = await axiosInstance.get('/get_rules');
                    localStorage.setItem('myapp-asts', JSON.stringify(response.data.allRules));
                    setRules(response.data.allRules);
                }
                else {
                    setRules(JSON.parse(localStorage.getItem('myapp-asts')!));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchRules();
        
    }, [])

    console.log(rules);

    return (
        <>
            <main className="grow w-full min-h-screen max-w-screen overflow-hidden bg-black text-white">
                <div className="m-2 flex flex-col items-center justify-center min-h-screen max-w-screen">
                    <Select
                        onValueChange={(value:modeType) => setMode(value)}>
                        <SelectTrigger className="md:w-1/2 p-6 text-xl backdrop-blur-3xl bg-white/5 font-bold">
                            <SelectValue placeholder="combineASTs" />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-3xl bg-white/5 text-white">
                            <SelectGroup>
                                <SelectLabel>Mode</SelectLabel>
                                <SelectItem value="combineASTs">Combine existing ASTs</SelectItem>
                                <SelectItem value="combineASTAndRule">Combine ASTs with a Rule String</SelectItem>
                                <SelectItem value="combineRules">Combine Rule Strings</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="w-full flex items-center justify-center flex-col md:p-2 mt-2 gap-4">
                        {mode != "combineRules" && rules.map((rule, index) => (
                            <div key={index} className="flex w-full md:w-1/2 gap-4 items-center border-2 rounded-md p-4">
                                <Input 
                                className="w-4 bg-gray-800 text-white"
                                type="checkbox" value={rule.name} onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedRules((prev) => ([...prev, rule.name]));
                                    }
                                    else {
                                        setSelectedRules(selectedRules.filter((name) => name !== rule.name));
                                    }
                                }} />
                                <Label className="text-2xl font-bold font-custom">{rule.name}</Label>
                            </div>
                        ))}
                        {mode === "combineASTAndRule" || mode === "combineRules" && 
                        <Input 
                            onChange={(e) => setRuleString(e.target.value)}
                            className="w-1/2 bg-white text-black text-xl p-2 mt-4" type="text" placeholder="Add rules in array format....."/>}
                    </div>
                    <div className="w-full flex items-center justify-center flex-col md:p-2 gap-4">
                        <Input
                            type="text"
                            className="md:w-1/2 mt-1 bg-white text-black text-xl p-2 w-full"
                            placeholder="Give Your Rule a Name....."
                            onChange={(e) => setRuleName(e.target.value)}
                        />
                    </div>
                    <Button 
                    onClick={handleCombineRules}
                    className="w-full md:w-1/2 p-4 mt-4 bg-white text-black text-xl hover:text-white hover:ring-2 ring-blue-400 ring-inset hover:backdrop-blur-lg transition-all duration-300">
                        {loading ? <Loader2 className="animate-spin"/> : 'Combine'}
                    </Button>
                </div>
            </main>
        </>
    )
}

export default MergeAsts
