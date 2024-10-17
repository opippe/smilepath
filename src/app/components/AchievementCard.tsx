import { Progress } from "@nextui-org/progress";

const AchievementCard = (props: { title: string, description: string, progress: number, image: string; }) => {
    return (
        <div className="flex p-2">
            <img className="mr-3 w-20 h-20" src={props.image} />
            <div>
                <p className="font-semibold text-lg">{props.title}</p>
                <p>{props.description}</p>
                <Progress
                    size="lg"
                    radius="lg"
                    classNames={{
                        base: "max-w-sm bg-slate-200 h-2 rounded mt-3",
                        track: "border-none border-default rounded",
                        indicator: "bg-teal-500",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                    }}
                    value={65}
                    showValueLabel={false}
                />
            </div>
        </div>
    )
}

export default AchievementCard;