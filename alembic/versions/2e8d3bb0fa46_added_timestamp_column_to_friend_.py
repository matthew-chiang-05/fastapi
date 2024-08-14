"""added timestamp column to friend_requests table

Revision ID: 2e8d3bb0fa46
Revises: 1ac091d7d883
Create Date: 2024-08-13 22:33:24.443103

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2e8d3bb0fa46'
down_revision: Union[str, None] = '1ac091d7d883'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('friend_requests', sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default= sa.text('NOW()')))
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    op.drop_column('friend_requests', 'created_at')
    pass
    # ### end Alembic commands ###
