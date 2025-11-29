import {  useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { LabelInputContainer } from "./LogIn";
import { Button } from "./components/elements/Button";

const TitleComponent = ({ title, setTitle, yearDone, setYear, member, setMember }: { title: string, setTitle: (newTitle: string) => void, yearDone: number, setYear: (newYear: number) => void; member: Array<string>, setMember: (newMember: string[]) => void; }) => {
    const [count, setCount] = useState(4);
   

    return (
        <form className="h-[100%] w-[80%] bg-gray-900 flex flex-col items-center">
            <div className="flex flex-row w-full h-[20%]  items-center justify-around ">
                <LabelInputContainer className="w-[45%]">
                    <Label htmlFor="Title">Title :</Label>
                    <Input
                        id="Title"
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="w-[45%]">
                    <Label htmlFor="yearDone">yearDone :</Label>
                    <Input
                        id="yearDone"
                        placeholder="yearDone"
                        type="date"
                        value={yearDone ? `${yearDone}-01-01` : ""}
                        onChange={(e) => {
                            const year = e.target.value.split("-")[0];
                            setYear(Number(year));
                        }}
                    />
                </LabelInputContainer>
            </div>
            <div
                className="flex flex-wrap gap-4 overflow-x-scroll items-center justify-center"
                style={{ maxHeight: "250px" }}
            >
                {Array.from({ length: count }).map((_, index) => (
                    <LabelInputContainer key={index} className="w-[30%]">
                        <Label htmlFor={`teamMember${index}`}>{"Member" + (index + 1)} :</Label>
                        <Input
                            id={`teamMember${index}`}
                            placeholder={`member${index}`}
                            type="text"
                            value={member[index] || ""}
                            onChange={(e) => {
                                const updatedMembers = [...member];
                                updatedMembers[index] = e.target.value;
                                setMember(updatedMembers);
                            }}
                        />
                    </LabelInputContainer>
                ))}
            </div>
            <Button
                onClick={() => setCount(count + 1)}
                className=" h-[30px] w-[100px] text-white bg-green-500"
            >
                Add Member
            </Button>
        </form>
    );
};

export default TitleComponent;