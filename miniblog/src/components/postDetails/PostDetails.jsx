import style from './PostDetails.module.css';

import { Link } from 'react-router-dom';

const PostDetails = ({ post }) => {
    return (
        <div className={style.post_details}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={style.createdBy}>{post.createdBy}</p>
            <div className={style.tags}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}><span>#</span>{tag}</p>
                ))}
            </div>
            <Link className="btn btn-outline" to={`/posts/${post.id}`}>Ler</Link>
        </div>
    );
};

export default PostDetails;
