"""empty message

Revision ID: 4aa6154b5e9c
Revises: 89d9781816ff
Create Date: 2019-02-18 08:38:36.144600

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4aa6154b5e9c'
down_revision = '89d9781816ff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('list', sa.Column('name', sa.String(length=255), nullable=True))
    op.add_column('list', sa.Column('order', sa.Integer(), nullable=True))
    op.create_unique_constraint(None, 'list', ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'list', type_='unique')
    op.drop_column('list', 'order')
    op.drop_column('list', 'name')
    # ### end Alembic commands ###
