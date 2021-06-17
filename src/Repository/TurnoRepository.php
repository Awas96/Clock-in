<?php

namespace App\Repository;

use App\Entity\Turno;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Turno|null find($id, $lockMode = null, $lockVersion = null)
 * @method Turno|null findOneBy(array $criteria, array $orderBy = null)
 * @method Turno[]    findAll()
 * @method Turno[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TurnoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Turno::class);
    }

    // /**
    //  * @return Turno[] Returns an array of Turno objects
    //  */

    public function findByEvento($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.evento = :val')
            ->setParameter('val', $value)
            ->orderBy('t.horaInicio', 'DESC')
            ->getQuery()
            ->getOneOrNullResult();
    }


    public function findById($value): ?Turno
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }

}
