from flask import Blueprint
from .model import List
from connexion import request, NoContent
from src import db

lists = Blueprint('lists', __name__)


def create(body):
    """
    Responds to a POST request for /api/lists
    :return:
    """
    name = body['name']
    board_id = body['board_id']
    list = List(name, board_id)
    list.save()
    response = {
        'id': list.id,
        'name': list.name,
        'order': list.order
    }
    return response, 201


def get_all(board_id):
    """
    Responds to GET request for /api/lists/<board_id>
    :param board_id:
    :return:
    """
    results = []
    lists = List.query.filter_by(board_id=board_id)

    for list in lists:
        res = {
            'name': list.name,
            'order': list.order,
            'id': list.id,
            'board_id': list.board_id
        }
        results.append(res)

    return results, 200


def put(board_id, id, body):
    """
    Responds to PUT request for /api/lists/<board_id>/<id>
    :param board_id:
    :param id:
    :param body: the request body needs key: 'name'
    :return:
    """
    list = List.query.filter_by(board_id=board_id, id=id).first()
    name = body['name']
    order = int(body['order'])
    if list:
        list.update(name, order)
        return 'Updated list name to: ' + list.name + ' and order to:' + str(list.order), 200
    else:
        return 'List does not exist', 404

def delete(board_id, id):
    """
    :param id:
    Responds to DELETE request for /api/lists/<board_id>/<id>
    :return:
    """
    list = List.query.filter_by(board_id=board_id, id=id).first()

    if list:
        list.delete()
        return NoContent, 204
    else:
        return 'List does not exist', 404