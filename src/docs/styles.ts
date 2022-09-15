export const borders = {
    radius: ["5px"],
};

export const colors = {
    violet: ["#8383f3", "#6161cb"],
};

export const span = (points: number, offsetInPixels = 0, pointsInPixels = 8) =>
    points * pointsInPixels + offsetInPixels + "px";

export const styles = { borders, colors, span };
