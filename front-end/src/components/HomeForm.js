const HomeForm = () => {
    return (
        <form action="https://formspree.io/f/moqzodyj" method="POST">
            <div className="mail_section_1">
                <input type="email" className="form-control mb-3" placeholder="Email" name="Email" required />
                <textarea className="form-control mb-3" placeholder="Message" rows="5" id="comment" name="Message" required></textarea>
                <button type="submit" className="btn btn-primary">SEND</button>
            </div>
        </form>
    )
}

export default HomeForm