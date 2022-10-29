import React from "react";

type Props = {
    children: React.ReactNode;
};

function ButtonNeon({ children }: Props) {
    return (
        <div className="group relative">
            <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
            {children}
        </div>
    );
}

export default ButtonNeon;
