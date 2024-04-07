import { shows } from "@/data/shows";
import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { vapi } from "@/lib/vapi.sdk";
import React, { useEffect } from "react";
import { ShowsComponent } from "./shows";
import { Ticket } from "./ticket";

function Display() {
  const [showList, setShowList] = React.useState<Array<(typeof shows)[number]>>(
    []
  );
  const [showNotedPoints, setShowNotedPoints] = React.useState<boolean>(true);

  const [notedPoints, setNotedPoints] = React.useState<Array<String>>([
  
  ]);

  const [status, setStatus] = React.useState<"show" | "confirm" | "ticket">(
    "show"
  );

  const [selectedShow, setSelectedShow] = React.useState<
    (typeof shows)[number] | null
  >(null);

  const [confirmDetails, setConfirmDetails] = React.useState<{}>();

  useEffect(() => {
    const onMessageUpdate = (message: Message) => {
      if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        message.functionCall.name === "suggestShows"
      ) {
        setStatus("show");
        vapi.send({
          type: MessageTypeEnum.ADD_MESSAGE,
          message: {
            role: "system",
            content: `Here is the list of suggested shows: ${JSON.stringify(
              shows.map((show) => show.title)
            )}`,
          },
        });
        setShowList(shows);
      } else if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        message.functionCall.name === "storeKeyPoints"
      ) {
        const memoryPoint = message.functionCall.parameters.memoryPoint;
        console.log("memory to remember = ", memoryPoint);
        setNotedPoints(notedPoints=>[...notedPoints, memoryPoint])
      }
    };

    const reset = () => {
      setStatus("show");
      setShowList([]);
      setSelectedShow(null);
    };

    vapi.on("message", onMessageUpdate);
    vapi.on("call-end", reset);
    return () => {
      vapi.off("message", onMessageUpdate);
      vapi.off("call-end", reset);
    };
  }, []);

  return (
    <>
      <h1 onClick={() => setShowNotedPoints(curr => !curr)} className="cursor-pointer font-bold text-center">Noted Points</h1>
      {showNotedPoints && (
        <div>
          {notedPoints.map((point, index) => (
            <p key={index}>{point}</p>
          ))}
        </div>
      )}

      {showList.length > 0 && status == "show" ? (
        <ShowsComponent showList={showList} />
      ) : null}
      {status !== "show" ? (
        <Ticket
          type={status}
          show={selectedShow ?? shows[0]}
          params={confirmDetails}
        />
      ) : null}
    </>
  );
}

export { Display };
