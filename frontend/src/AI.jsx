import { useState } from 'react';
import services from "./services";
import example from "./assets/photo.jpg";

export const AI = () => {
    const [formData, setFormData] = useState({ prompt: '' })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [imgStr, setImgStr] = useState('')

    const handleTextInputChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (event) => {
        setLoading(true);        
        services.user.AI(formData.prompt)
        .then((data) => {console.log(111)
            setLoading(false);
            if (data) {
                const imgStr = `data:image/png;base64,${data.image}`;
                setImgStr(imgStr);
                setMessage('Image generated successfully');
            } else {
                setMessage('Something went wrong');
            }
            setFormData({ prompt: '' })
        })
        .catch((err) => {
            setLoading(false);
            setMessage(JSON.stringify(err.response.data, null, 2));
        });
        
        event.preventDefault();
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            AI Text to Image
                        </h2>
                        <div className="mt-2 text-center text-sm text-gray-600">
                            <span className="font-medium text-gray-900">
                                Please wait for the image to be generated
                            </span>
                        </div>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="prompt">
                                    Input Text Here
                                </label>
                                <input
                                    name="prompt"
                                    type="text"
                                    required
                                    className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="ex: pen on a table"
                                    value={formData.prompt}
                                    onChange={handleTextInputChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white enabled:hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                    {imgStr && (
                        <div className="flex justify-center">
                            {/* base64 image */}
                            <img src={imgStr} alt="Generated image" />
                        </div>
                    )}
                    {loading && (
                        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center p-0 mt-0">
                            <div className="text-center text-blue-500 flex flex-col items-center bg-white/80 rounded-full">
                                <p className="text-xl">Generating image...</p>
                            </div>
                            {/* <Spinner className="ml-2" color="#1a202c" /> */}
                        </div>
                    )}
                </div>
            </div>
            <pre className="text-center">{message}</pre>
        </>
    )
}

export default AI;