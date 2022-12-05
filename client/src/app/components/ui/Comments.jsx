import { orderBy } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createComment, getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from '../../store/comments';
import { AddCommentForm, CommentsList } from '../common/comments';

const Comments = () => {
    const params = useParams()
    const userId = params['*']
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])
    const isLoading = useSelector(getCommentsLoadingStatus())
    const comments = useSelector(getComments())

    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: userId }))
    }
    const handleRevomeComment = (id) => {
        dispatch(removeComment(id))
    }
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])

    return (
        <div>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading
                            ?
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRevomeComment} />
                            :
                            'Loading...'
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;