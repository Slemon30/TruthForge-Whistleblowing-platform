export default function Input({Label,Type,...props}){
    return(
        <>
            <label htmlFor=""><span className=" font-serif font-semibold">{Label}</span></label>
            <input type={Type} {...props} />
        </>
    );
}