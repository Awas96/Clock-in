<?php

namespace App\Repository;

use App\Entity\Evento;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Evento|null find($id, $lockMode = null, $lockVersion = null)
 * @method Evento|null findOneBy(array $criteria, array $orderBy = null)
 * @method Evento[]    findAll()
 * @method Evento[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EventoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Evento::class);
    }

    // /**
    //  * @return Evento[] Returns an array of Evento objects
    //  */

    public function findByUsIdAndDate($id, $start, $end)
    {
        dump($end);
        $query = $this->createQueryBuilder('e')
            ->andWhere('e.usuario = :val')
            ->andwhere('e.fecha BETWEEN :start AND :end')
            ->setParameter('val', $id)
            ->setParameter('start', $start)
            ->setParameter('end', $end)
            ->orderBy('e.fecha', 'ASC')
            ->getQuery()
            ->getResult();
        dump($query);
        return $query;
    }


    public function findById($value): ?Evento
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }

}
