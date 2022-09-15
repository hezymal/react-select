export const borders = {
    radius: ["5px"],
};

export const colors = {
    grey: ["#eeeeee", "#f3f3f3", "#fafafa", "#949494"],
};

export const span = (points: number, offsetInPixels = 0, pointsInPixels = 8) =>
    points * pointsInPixels + offsetInPixels + "px";

export const styles = { borders, colors, span };
