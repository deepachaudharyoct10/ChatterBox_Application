import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { BsIncognito } from "react-icons/bs";
import { updateMessage } from "../redux/messageSlice";
import { BASE_URL } from "../utils/constants";

const HiddenMessageCard = ({ message }) => {
    const dispatch = useDispatch();
    const [guessing, setGuessing] = useState(false);

    const guessHandler = async (category) => {
        if (guessing) return;
        setGuessing(true);
        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/message/guess/${message._id}`,
                { category },
                { withCredentials: true }
            );
            const data = res.data;

            if (data.correct) {
                toast.success("🎉 Correct! You've guessed the message type.");
                dispatch(updateMessage({ _id: message._id, revealed: true, message: data.message, category: data.category }));
            } else if (data.autoRevealed) {
                toast.error("❌ Incorrect guess. The message has been revealed.");
                dispatch(updateMessage({ _id: message._id, revealed: true, message: data.message, category: data.category }));
            } else {
                toast.error(`❌ Incorrect guess. Try again! (${data.attemptsLeft} attempt${data.attemptsLeft === 1 ? "" : "s"} left)`);
            }
        } catch (error) {
            console.log(error);
        }
        setGuessing(false);
    };

    return (
        <div className="bg-base-200 border border-base-300 rounded-lg p-3 max-w-xs">
            <div className="flex items-center gap-2 mb-2 text-neutral">
                <BsIncognito />
                <span className="text-sm font-semibold">Hidden Message</span>
            </div>
            <p className="text-xs text-neutral/60 mb-2">Guess the category to reveal it</p>
            <div className="grid grid-cols-2 gap-2">
                {message.options?.map((option) => (
                    <button
                        key={option}
                        type="button"
                        disabled={guessing}
                        onClick={() => guessHandler(option)}
                        className="btn btn-xs btn-outline"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HiddenMessageCard;
