export const optionForLoop = (number) => {
    let arr = [];

    for (let i = 1; i <= number; i++) {
        arr.push(<option value={i}>{i}</option>);
    }
    return arr;
};
